import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ethers, BigNumber } from 'ethers';
import ERC20ABI from '../assets/json/ERC20.json';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private accountSubject: BehaviorSubject<string>;
  public account: Observable<string>;
  public networkChanged = new Subject<string>();
  public provider: ethers.providers.Web3Provider | undefined;

  constructor(private ngZone: NgZone) {

    if (localStorage["account"]) {
      this.accountSubject = new BehaviorSubject<string>(localStorage["account"]);
    } else {
      this.accountSubject = new BehaviorSubject<string>("");
    }
    this.account = this.accountSubject.asObservable();

    //wire up provider and ethereum event callbacks
    if (this.nativeWindow.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.nativeWindow.ethereum);
      this.nativeWindow.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.ngZone.run(() => {
          if (accounts.length > 0) {
            this.accountSubject.next(accounts[0]);
            localStorage.setItem("account", accounts[0]);
          } else {
            this.accountSubject.next("");
            localStorage.removeItem("account");
          }
        });

      });

      this.nativeWindow.ethereum.on('chainChanged', (chainId: string) => {
        this.ngZone.run(() => {
          this.networkChanged.next(this.getNetworkName(chainId));
        });

      });


    }
  }
  public get hasWeb3(): boolean {
    if (this.nativeWindow.ethereum) {
      return true;
    } else {
      return false;
    }
  }
  public disconnect() {
    this.accountSubject.next("");
    localStorage.removeItem("account");

  }
  public async getBalance(tokenAddress: string): Promise<BigNumber> {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, this.provider);
    return await tokenContract.balanceOf(this.accountSubject.value);
  }

  public async getAccounts() {
    const accounts = await this.nativeWindow.ethereum.request({ method: 'eth_requestAccounts' });
    this.accountSubject.next(accounts[0]);
    localStorage.setItem("account", accounts[0]);
  }

  get nativeWindow(): any {
    return _window();
  }
  public getNetwork() {
    if (this.hasWeb3) {
      this.networkChanged.next(this.getNetworkName(this.nativeWindow.ethereum.chainId));
    }
  }
  private getNetworkName(id: string): string {
    switch (id) {
      case "0x1":
        return "";
      case "0x2a":
        return "Kovan Network";
      case "0x64":
        return "xDai"
      default:
        return "Unknown Network";
    }
  }

}
