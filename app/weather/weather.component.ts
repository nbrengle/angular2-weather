import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



import { WeatherService } from './weather.service';

@Component({
	selector: 'gs-weather',
	templateUrl: 'app/weather/weather.component.html',
	providers: [JSONP_PROVIDERS, WeatherService],
})

export class WeatherComponent {
	isVisible: boolean = false;
	//items: Observable <string[]>;

	private searchTermStream = new Subject<string>();

	constructor (private weatherService: WeatherService) {}

	search(term: string) {this.isVisible = false;  this.searchTermStream.next(term); }

	items = this.searchTermStream
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((term: string) => this.weatherService.search(term))
    .subscribe(data => {this.isVisible = true; console.log(data); this.items =  data});

	get_cond_image(cond_num: number): string {
		return cond_imgs[cond_num];
	}

	get_cond_text(cond_num: number): string {
		return cond_words[cond_num];
	}

}

const cond_imgs = {
	0: "assets/images/icons/icon-8.svg",
	1: "assets/images/icons/icon-11.svg",
	2: "assets/images/icons/icon-11.svg",
	3: "assets/images/icons/icon-11.svg",
	4: "assets/images/icons/icon-11.svg",
	5: "assets/images/icons/icon-13.svg",
	6: "assets/images/icons/icon-14.svg",
	7: "assets/images/icons/icon-14.svg",
	8: "assets/images/icons/icon-14.svg",
	9: "assets/images/icons/icon-9.svg",
	10: "assets/images/icons/icon-14.svg",
	11: "assets/images/icons/icon-10.svg",
	12: "assets/images/icons/icon-10.svg",
	13: "assets/images/icons/icon-13.svg",
	14: "assets/images/icons/icon-13.svg",
	15: "assets/images/icons/icon-13.svg",
	16: "assets/images/icons/icon-13.svg",
	17: "assets/images/icons/icon-13.svg",
	18: "assets/images/icons/icon-13.svg",
	19: "assets/images/icons/icon-5.svg",
	20: "assets/images/icons/icon-5.svg",
	21: "assets/images/icons/icon-5.svg",
	22: "assets/images/icons/icon-5.svg",
	23: "assets/images/icons/icon-6.svg",
	24: "assets/images/icons/icon-6.svg",
	25: "assets/images/icons/icon-6.svg",
	26: "assets/images/icons/icon-6.svg",
	27: "assets/images/icons/icon-3.svg",
	28: "assets/images/icons/icon-3.svg",
	29: "assets/images/icons/icon-3.svg",
	30: "assets/images/icons/icon-3.svg",
	31: "assets/images/icons/icon-2.svg",
	32: "assets/images/icons/icon-2.svg",
	33:	"assets/images/icons/icon-2.svg",
	34:	"assets/images/icons/icon-2.svg",
	35:	"assets/images/icons/icon-14.svg",
	36:	"assets/images/icons/icon-2.svg",
	37:	"assets/images/icons/icon-12.svg",
	38:	"assets/images/icons/icon-12.svg",
	39:	"assets/images/icons/icon-12.svg",
	40:	"assets/images/icons/icon-9.svg",
	41:	"assets/images/icons/icon-14.svg",
	42:	"assets/images/icons/icon-13.svg",
	43:	"assets/images/icons/icon-14.svg",
	44:	"assets/images/icons/icon-3.svg",
	45:	"assets/images/icons/icon-11.svg",
	46:	"assets/images/icons/icon-14.svg",
	47:	"assets/images/icons/icon-12.svg",
	3200:	"assets/images/icons/icon-1.svg",
}

const cond_words = {
	0:	"tornado",
	1:	"tropical storm",
	2:	"hurricane",
	3:	"severe thunderstorms",
	4:	"thunderstorms",
	5:	"mixed rain and snow",
	6:	"mixed rain and sleet",
	7:	"mixed snow and sleet",
	8:	"freezing drizzle",
	9:	"drizzle",
	10:	"freezing rain",
	11:	"showers",
	12:	"showers",
	13:	"snow flurries",
	14:	"light snow showers",
	15:	"blowing snow",
	16:	"snow",
	17:	"hail",
	18:	"sleet",
	19:	"dust",
	20:	"foggy",
	21:	"haze",
	22:	"smoky",
	23:	"blustery",
	24:	"windy",
	25:	"cold",
	26:	"cloudy",
	27:	"mostly cloudy (night)",
	28:	"mostly cloudy (day)",
	29:	"partly cloudy (night)",
	30:	"partly cloudy (day)",
	31:	"clear (night)",
	32:	"sunny",
	33:	"fair (night)",
	34:	"fair (day)",
	35:	"mixed rain and hail",
	36:	"hot",
	37:	"isolated thunderstorms",
	38:	"scattered thunderstorms",
	39:	"scattered thunderstorms",
	40:	"scattered showers",
	41:	"heavy snow",
	42:	"scattered snow showers",
	43:	"heavy snow",
	44:	"partly cloudy",
	45:	"thundershowers",
	46:	"snow showers",
	47:	"isolated thundershowers",
	3200:	"not available"
}
