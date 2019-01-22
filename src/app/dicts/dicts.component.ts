import { Component, OnInit } from '@angular/core';
import { DictService } from '../dict.service';
import { ResDto } from '../ResDto';
import { PageReqDto } from '../pageReqDto';
import { LocalStorage } from '../local.storage';
import { ActivatedRoute ,Router} from '@angular/router';
import { Location } from '@angular/common';
import { SessionStorage } from '../session.storage';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dicts',
  templateUrl: './dicts.component.html',
  styleUrls: ['./dicts.component.css']
})
export class DictsComponent implements OnInit {

  constructor(
    private dictService: DictService,
    private ls: LocalStorage,
    private ss: SessionStorage,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.iniPage();
  }

  resDto: ResDto;

  pageNo: Number = 1;
  pageSize: Number = 5;

  isLoading = false;

  pageReqDto: PageReqDto = {
    "dictTypeCd": "",
    "dictTypeName": "",
    "pageNo": 1,
    "pageSize": 5
  };

  iniPage(): void{
    const page = this.ss.get('page');
    const pageReq = this.ss.getObject("pageReq");
    if (pageReq){
      this.pageReqDto = pageReq;
    }
    if (page){
      this.pageReqDto.pageNo = +page;
    }
    this.isLoading = true;
    this.dictService.getDictPage(this.pageReqDto)
    .subscribe(r => {
      this.resDto = r;
      this.isLoading = false;
    });
  }

  getPage() :void{
    this.isLoading = true;
    this.ss.set('page',this.pageReqDto.pageNo+'')
    this.dictService.getDictPage(this.pageReqDto)
    .subscribe(r => {this.resDto = r; this.isLoading = false});
  }

  search(): void{
    this.isLoading = true;
    this.ss.set('page',1+'')
    
    this.pageReqDto.pageNo = 1;
    this.ss.setObject("pageReq",this.pageReqDto);
    this.dictService.getDictPage(this.pageReqDto)
    .subscribe(r => {this.resDto = r; this.isLoading = false;});
  }

  gotoNewPage() :void{
    this.router.navigateByUrl("/detail/-1")
  }

  deleteType(id: string) :void{
    this.dictService.deleteDictType(id)
    .subscribe(r => {
      this.createBasicMessage(r.msg);
      this.iniPage();
    });
  }


  createBasicMessage(msg: string): void {
    this.message.info(msg);
  }

}
