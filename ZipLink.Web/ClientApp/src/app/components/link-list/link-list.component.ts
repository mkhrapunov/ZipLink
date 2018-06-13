import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Time } from '@angular/common';
import { UserLink } from '../../models/userLink';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit, OnDestroy {

  public userLinks: UserLink[];
  public errors: string;
  private linkAddedSubscription: any;

  constructor(private linkService: LinkService, @Inject('BASE_URL') public baseUrl: string) { }

  ngOnInit() {
    this.linkAddedSubscription = this.linkService.onLinkAdded.subscribe(() => this.getLinks());
    this.getLinks();
  }

  ngOnDestroy(): void {
    this.linkAddedSubscription.unsubscribe();
  }

  getLinks() {
    this.linkService.getLinks().subscribe(
      resp => this.userLinks = <UserLink[]>resp.json(),
      err => this.errors = err);
  }

}

