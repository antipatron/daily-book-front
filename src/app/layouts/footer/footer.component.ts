import { Component, OnInit } from '@angular/core';
import {Constants} from "../../shared/utilities/constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * Footer Component
 */
export class FooterComponent implements OnInit {

  TEAM_URL = Constants.TEAM_URL;

  constructor() {}
  /***
   * Current year
   */
  year: number = new Date().getFullYear();

  ngOnInit(): void {}
}
