import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AccountsService } from '../../_services/accounts.service';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  private accountService = inject(AccountsService);
  memberService = inject(MembersService);
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();

    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers();
  }

  resetFilters(){
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    if(this.memberService.userParams().pageNumber !== event.page){
      this.memberService.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
