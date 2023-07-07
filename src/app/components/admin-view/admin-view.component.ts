import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/interfaces/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['title', 'company', 'description', 'location', 'salaryRange', 'skills'];
  dataSource: MatTableDataSource<Job>;
  listJobs: Job[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _jobService : JobService) {
       
    this.dataSource = new MatTableDataSource<Job>(this.listJobs);
    
  }

  ngOnInit(): void {
    this.getJobs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getJobs(){
    this._jobService.getJobs().subscribe(data => {
      this.listJobs = data;
      this.dataSource.data = this.listJobs;
      console.log(this.dataSource.data);

    });  

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
