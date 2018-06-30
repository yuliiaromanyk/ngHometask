import { Component, OnInit, Input } from "@angular/core";
import { SearchUsersService } from "../search-users.service";

@Component({
  selector: "app-search-users",
  templateUrl: "./search-users.component.html",
  styleUrls: ["./search-users.component.css"]
})
export class SearchUsersComponent implements OnInit {
  name: string;
 

  results: any[] = []; 
  selected: boolean = false; 
  selectedUser: any; 
  error_text: string = ""; 

  constructor(private searchService: SearchUsersService) {}
  ngOnInit() {}

  search(name: string) {
    this.selected = false;
    this.error_text = "";
    if (name ) {
      this.name = name;
      this.searchService

        .getUsersByName(name)
        .subscribe(
          users => {
            this.results = users;
          },
          error => {
            this.results = [];
            this.error_text = "No users found";
            console.error(error);
          }
        );
    }
  }

  getDetails(username: string) {
    this.searchService.getDetailsByUserName(username).subscribe(
      userDatils => {
        this.selectedUser = userDatils;
        this.selected = true;
      },
      error => {
        this.selected = false;
        console.error(error);
      }
    );
  }
}
