import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkForReduction } from '../../models/linkForReduction';
import { LinkService } from '../../services/link.service';
import { BadResponse } from '../../models/badResponse';

@Component({
  selector: 'app-add-link-form',
  templateUrl: './add-link-form.component.html'
})
export class AddLinkFormComponent implements OnInit {

  errors: string;

  constructor(private http: Http, private router: Router, private linkService: LinkService, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  add({ form, valid }: { form: NgForm, valid: boolean })
  {
    this.errors = '';

    if (valid) {
      let linkForReduction = <LinkForReduction>form.value;
      this.linkService.add(linkForReduction).subscribe(
        resp => form.reset(),
        err => this.errors = (<BadResponse>err.json()).Message);
    }
  }
}


