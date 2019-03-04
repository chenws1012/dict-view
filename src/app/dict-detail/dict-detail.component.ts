import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DictService } from '../dict.service';
import { ResDto } from '../ResDto';
import { Location } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dict-detail',
  templateUrl: './dict-detail.component.html',
  styleUrls: ['./dict-detail.component.css']
})
export class DictDetailComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private dictService: DictService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getDictData();
    this.validateForm = this.fb.group({
      typeCd           : [ null, [ Validators.required ] ],
      typeName         : [ null, [ Validators.required ] ],
      comment          : [ null, [ Validators.required ] ],
      seq              : [ null, [ Validators.required ] ],
      valid            : [ true ]
    });
  }

  dictData: any;

  getDictData(): void{
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id === '-1'){
      this.initNewData();
      return;
    }
    this.dictService.getDictById(id)
    .subscribe(r => {
      this.dictData = r.body;
      this.dataSet = this.dictData['dictDataDtos'];
      this.updateEditCache();
    });

  }

  initNewData(){
    this.dictData = {
      "dictDataDtos":[],
      "dictTypeCd":"",
      "dictTypeName":"",
      "dispOrderNo":0,
      "enableFlg":true,
      "id":"-1",
      "remark":""
     }
     this.dataSet = [];
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.validateForm.status)
    if(this.validateForm.status === "VALID"){
      if (+this.dictData.id < 0){
        this.dictService.addNew(this.dictData)
        .subscribe(r => {
          this.createBasicMessage(r.msg);
          if(r.code === "200"){
            this.router.navigateByUrl("/")
          }
        });
      }else{
        this.dictService.edit(this.dictData)
        .subscribe(r => {
          this.createBasicMessage(r.msg);
        });
      }
    }
  }

  i = 0;
  editCache = {};
  dataSet :any;

  addRow(): void {
    this.i++;
    if(!this.dataSet){
      this.dataSet = []
    }
    this.dataSet = [ ...this.dataSet, {
      dictCd: "",
      dictName: "",
      dispOrderNo: this.i,
      enableFlg: true,
      i18n: "",
      id: "-"+this.i,
      remark: ""
    } ];
    this.dictData['dictDataDtos'] = this.dataSet;
    this.updateEditCache();
    this.startEdit("-"+this.i);
  }

  deleteRow(key: string): void {
    const dataSet = this.dataSet.filter(d => d.id !== key);
    this.dataSet = dataSet;
    this.dictData['dictDataDtos'] = this.dataSet;
  }

  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.id === key);
    Object.assign(this.dataSet[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.id ]) {
        this.editCache[ item.id ] = {
          edit: false,
          data: {...item}
        };
      }
    });
  }

  createBasicMessage(msg: string): void {
    this.message.info(msg);
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  sortChange(sort: {key: string, value: string}): void {
    if (sort.value){
      const sortData = this.dataSet.sort( (a,b) => (sort.value === 'ascend') ? (a[sort.key] > b[sort.key] ? 1 : -1) : (b[sort.key] > a[sort.key] ? 1 : -1 ) );
      this.dataSet = sortData;
    }
  }

}

