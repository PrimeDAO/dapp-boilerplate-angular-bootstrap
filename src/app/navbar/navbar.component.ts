import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }
  public address: string = ""; 
  public network: string = "";
  public navbarCollapsed: boolean = false;

  ngOnInit(): void {
    this.web3Service.account.subscribe((address:string) => {
      this.address = address;
    });
    this.web3Service.networkChanged.subscribe((network:string) => {
      this.network = network;
    });
    this.web3Service.getNetwork();

  }



}
