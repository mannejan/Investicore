import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { PropertyDto } from 'src/app/interface/property-dto';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss']
})
export class PropertyInfoComponent implements OnInit {

  property: PropertyDto;

  @Input()
  set event(event: PropertyDto){
    this.property = event;
  }

  asIsOrder(a, b) {
    return 1;
  }

  constructor(
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
  }

}
