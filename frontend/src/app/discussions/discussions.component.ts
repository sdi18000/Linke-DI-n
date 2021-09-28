import { Component, OnInit } from '@angular/core';
import { Discussion } from '../Discussion/discussion';
import { DiscussionService } from '../discussions.service';
import { MessageService } from '../messages.service';
import { proffessional } from '../Proffessional/proffessional';
import { UserDataService } from '../user-data.service';
import { Message } from '../Messages/message';
import { User } from '../User/user';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  
  discussions!: Discussion[];
  otherUserCurrent: any;
  id_prof: Number;
  active_discussion: Number;
  messages!: Message[];

  constructor(private ds: DiscussionService, private ud: UserDataService, private ms: MessageService) {
    this.id_prof = this.ud.proffessional.id_proffessional;
    this.active_discussion = -1;
  }

  ngOnInit(): void {
    this.ds.getDiscussions(this.id_prof).subscribe(data => {
      this.discussions = data;
      
      for(let i = 0; i < this.discussions.length; i++){
        let disc = this.discussions[i];
        let id_prof = this.id_prof == disc.id_proffessional1? disc.id_proffessional2: disc.id_proffessional1;
        this.ud.getUserFromProf(id_prof).subscribe(data => {
          this.discussions[i].otherUser = data;
        });
      }

    });
  }
  
  activateDiscussion(id_disc: Number, otherUser: User){

    this.ms.getDiscussions(id_disc).subscribe(data => {
      this.messages = data;
      this.otherUserCurrent = otherUser;
    });
  }

}
