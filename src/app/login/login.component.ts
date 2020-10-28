import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private web3Service: Web3Service, private router: Router) { }
  public hasWeb3: boolean = false;
  ngOnInit(): void {
    this.hasWeb3 = this.web3Service.hasWeb3;
  }
  async connect() {
    await this.web3Service.getAccounts();
    this.router.navigate(['/dashboard']);

  }

}
