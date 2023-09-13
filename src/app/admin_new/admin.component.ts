import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KpadService } from '../services/kpad.service';

@Component({
  selector: 'admin_new',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AppAdminComponent implements OnInit {
  title = 'kpad-service';

  deptForm = {
    "id": 0
  };

  deptData = [{deptId: '', deptName: '', onlineCount: 0, offlineCount: 0, maintanceCount: 0}];

  ngOnInit() {
    var _self = this;
    // this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id"));
    this.deptForm.id = 123;
    console.log("Form Id ", this.deptForm.id)
    if (!isNaN(this.deptForm.id) && this.deptForm.id > 0) {
      // debugger;
      this.service.get(this.deptForm.id, function (res: any, error: any) {
        _self.deptData = res;
        console.log("response   ", res)
        if (error) {
        }
      });
    }    
  }

  updatedServiceUrl: string = "";
  agentConfig: string = "";
  bu: string = "";
  team: string = "";
  interval: string = "";
  responseTimeout: string = "";
  deptName:string="";
  isMaintenance: boolean=false;
  form = {
    "updatedServiceUrl": "",
    "bu": "",
    "team": "",
    "interval": "",
    "responseTimeout": "",
    "deptName": "",
    "isMaintenance":false
  };
  constructor(private aroute: ActivatedRoute, private router: Router, private service: KpadService) { }
  submitData() {
    var _self = this;
    if (_self.updatedServiceUrl == '') {
      alert('Service Url should not be empty')
    } else {
      this.form.updatedServiceUrl = _self.updatedServiceUrl;
      this.form.bu = _self.bu;
      this.form.team = _self.team;
      this.form.interval = _self.interval;
      this.form.responseTimeout = _self.responseTimeout;
      this.form.deptName = _self.deptName;
      this.form.isMaintenance = _self.isMaintenance;
      console.log("Form Data ", this.form)
      this.service.updateAgentIndexConfig(this.form, function (res: any, error: any) {
        // debugger;
        console.log("response   ", res)
        console.log("error   ", error)
        if (error) {
          console.log("response 11  ", res.error)
          alert(res.error.errorMessage)
          return res;
        }
        _self.agentConfig = res[0].agentConfig;
       
      });
    }
  }
}
