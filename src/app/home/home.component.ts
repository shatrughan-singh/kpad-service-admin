import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KpadService } from '../services/kpad.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'kpad-service';

  form = {
    "id": 0
  };

  deptData = [{deptId: '', deptName: '', onlineCount: 0, offlineCount: 0, maintanceCount: 0}];

  serviceUrlData = [{agentConfig: '', deptName: '', serviceUrl: '', agentConfigId: '', isMaintenance: false}];

  //Server success/fail message
  message = "";

  //Server error
  success: boolean = true;
  /**
   * Injects services 
   * 
   * @param aroute 
   * @param router 
   * @param service 
   */

  constructor(private aroute: ActivatedRoute, private router: Router, private service: KpadService) { }

  onSelect() {
    this.router.navigate(['/department']);
  }

  elnt: boolean = false;

  allchart() {
    // this.router.navigate(['/department']);
  }

  /**
   * Display record if primary key is received 
   */
  ngOnInit() {
    var _self = this;
    // this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id"));
    this.form.id = 123;
    console.log("Form Id ", this.form.id)
    if (!isNaN(this.form.id) && this.form.id > 0) {
      // debugger;
      this.service.getServiceUrlDetailsList(function (res: any, error: any) {
        _self.serviceUrlData = res;
        console.log("response   ", res)
        if (error) {
        }
      });
    }
    
  }

  getString(obj: any) {
    return JSON.stringify(obj);
  }

}
