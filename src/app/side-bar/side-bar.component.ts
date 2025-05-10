import { Component, OnInit, signal, computed, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  private records = signal<{ [key: string]: any }>({});
  public keys = computed(() => Object.keys(this.records()));

  @Output() recordSelected = new EventEmitter<string>();
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ [key: string]: any }>('assets/data.json').subscribe(data => {
      this.records.set(data);
    });
  }

  onRecordSelected(key: string) {
    this.recordSelected.emit(key);
  }

  public getRecord(key: string): any {
    return this.records()[key];
  }
}
