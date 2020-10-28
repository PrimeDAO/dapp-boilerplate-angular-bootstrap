import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';
import { Router } from '@angular/router';
import { Token } from '../token';
import tokens from '../../assets/json/tokens.json';
import { ethers, BigNumber } from 'ethers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private web3Service:Web3Service, private router:Router) { 
    this.tokens = tokens as Token[];

  }
  public address: string = "";
  public tokens:Token[] = [];

  ngOnInit(): void {
    this.web3Service.account.subscribe((address: string) => {
      if (address != this.address) {
        this.address = address;
        this.loadBalances();
      }
    });
  }
  async loadBalances() {
   
      this.tokens.forEach(async (t: Token) => {
        if (t.symbol == "ETH") {
            const b = await this.web3Service.provider!.getBalance(this.address);
            t.balance = ethers.utils.formatEther(b);
          } else {
            const balance: BigNumber = await this.web3Service.getBalance(t.address);
            t.balance =  ethers.utils.formatUnits(balance,t.decimals);
          }
          this.tokens = this.tokens.sort((a:Token, b: Token) => a.name.localeCompare(b.name));
      });
  }

  disconnect() {
    this.web3Service.disconnect();
    this.router.navigate(['/']);

  }
}
