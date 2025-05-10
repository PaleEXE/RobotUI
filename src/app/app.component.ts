// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'robot-ui';

  // hold the entire JSON here
  public records: { [key: string]: any } = {};

  // the key of the clicked sidebar item
  public selectedKey: string | null = null;

  // the full record object for convenience
  public selectedRecord: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ [key: string]: any }>('assets/data.json')
      .subscribe(data => {
        this.records = data;
      });
  }

  // called when sidebar emits
  onRecordSelected(key: string) {
    this.selectedKey = key;
    this.selectedRecord = this.records[key];
  }
}
