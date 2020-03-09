import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpResponse } from '@angular/common/http';
import { PropertyDto } from './interface/property-dto';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PropertyInfoComponent } from './modals/property-info/property-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Investicore';

  loading = true;

  bsModalRef: BsModalRef;

  properties:PropertyDto[];
  mostExpensiveProperties: PropertyDto[];
  roofTypes: any;
  zonedProperties: any;
  propertyType: any;

  biggestProperty: PropertyDto;
  mostExpensiveProperty: PropertyDto;
  mostValuableProperty: PropertyDto;
  mostImprovements: PropertyDto;


  constructor(
    private apiService: ApiService,
    private modalService: BsModalService
  ){}

  sortBy(group, key) {
    return group.reduce((previous, current) => {
      previous[current[key].trim()] = [...previous[current[key].trim()] || [], current];
      return previous
    }, {})
  }

  mapObject(obj){
    return Object.keys(obj).map(key => {
        return {
          "name": key,
          "value": obj[key].length
        }
    })
  }

  getPropertyDtos(){

    this.loading = true;

    this.apiService.getPropertyDtos().subscribe(
      (response: HttpResponse<PropertyDto>) => {
        this.properties = response.body;

        this.mostExpensiveProperties = [...this.properties].sort((a, b) => b.propertyPrice - a.propertyPrice)
                                      .map(prop => {
                                        return {...prop, 'value': prop.propertyPrice, 'name': prop.companyName}
                                      })
                                      .splice(0, 5);

        let roofTypeSort = this.sortBy(this.properties, 'roofType');
        this.roofTypes = this.mapObject(roofTypeSort);

        let zoningSort = this.sortBy(this.properties, 'zoning');
        this.zonedProperties = this.mapObject(zoningSort);

        let typeSort = this.sortBy(this.properties, 'typeDescription');
        this.propertyType = this.mapObject(typeSort);

        this.biggestProperty = [...this.properties].sort((a, b) => b.erfSize - a.erfSize)[0];
        this.mostExpensiveProperty = [...this.properties].sort((a, b) => b.purchasePrice - a.purchasePrice)[0];
        this.mostValuableProperty = [...this.properties].sort((a, b) => b.propertyPrice - a.propertyPrice)[0];
        this.mostImprovements = [...this.properties].sort((a, b) => b.improvements - a.improvements)[0];


        this.loading = false;
      }
    )
  }

  ngOnInit(){
    this.getPropertyDtos();
  }

  openPropertyDetails(propertyToShow:PropertyDto){

    const modalOptions = {
      backdrop: true,
      class: 'modal-lg'
    }

    this.bsModalRef = this.modalService.show(PropertyInfoComponent, modalOptions)
    this.bsModalRef.content.event = propertyToShow;
  }

  onMostExpensiveSelect(event){
    let property = this.mostExpensiveProperties.find(prop => typeof event === 'string' ? prop.companyName === event : prop.companyName === event.name);
    this.openPropertyDetails(property)
  }

  ngOnDestroy(){
  }

}
