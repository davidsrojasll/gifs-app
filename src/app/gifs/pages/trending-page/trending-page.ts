import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TredingPage implements AfterViewInit{
  gifService = inject( GifService );
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv ) return;

    scrollDiv.scrollTop = this.scrollStateService.trendeingScrollState();
  }
  
  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv ) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    //console.log({scrollTop, clientHeight, scrollHeight});

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendeingScrollState.set(scrollTop);

    if( isAtBottom ){
      this.gifService.loadTrendingGifs();
    }
  }
  
}
