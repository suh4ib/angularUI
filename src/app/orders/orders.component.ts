import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  search = '';
  modefilters = [];
  statefilters = [];

  orders = [{id: 'ORDER01', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'On Going', via: 'Swiggy' },
            {id: 'ORDER02', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Pick up', state: 'On Going', via: 'Zomato'},
            {id: 'ORDER06', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Dining', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER01', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER02', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Pick up', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER06', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Dining', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER03', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Dining', state: 'Billed', via: 'Resturant'},
            {id: 'ORDER04', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Take Away', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER05', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'Completed', via: 'Resturant'},
            {id: 'ORDER04', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Take Away', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER05', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'Completed', via: 'Resturant'},
            {id: 'ORDER04', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Take Away', state: 'Placed', via: 'Resturant'},
            {id: 'ORDER05', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'Completed', via: 'Resturant'},
            {id: 'ORDER04', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Take Away', state: 'On Going', via: 'Resturant'},
            {id: 'ORDER05', amount: '2000.00', content: 'Panner x 1, Manchurian x 2, Naan x 4, Spring Roll x 3', time: '12:34 pm', mode: 'Home Delivery', state: 'Completed', via: 'Resturant'},
          ];

  dispOrders = this.orders;

  modes = this.getAvailableModes();

  orderStates = this.getAvailableStates();

  selectedOrder = null;

  selected(order): void{
    this.selectedOrder = {...order, ...{address: '10880 Malibu Point, California',
                            items: [{name: 'Panner', quantity: '1', price: '200.00'  },
                                    {name: 'Mushroom', quantity: '1', price: '200.00'  },
                                    {name: 'Mushroom', quantity: '1', price: '200.00'  },
                                    {name: 'Mushroom', quantity: '1', price: '200.00'  },
                                    {name: 'Mushroom', quantity: '1', price: '200.00'  },
                                     {name: 'Mushroom', quantity: '1', price: '200.00'  },
                                    {name: 'Gobi', quantity: '1', price: '200.00'  },
                                    {name: 'Chicken', quantity: '1', price: '200.00'  }]}};
  }

  onKeyEnter(event): void {
    this.search = event.target.value;

    if (this.search === ''){
      this.dispOrders = this.orders;
    }
    this.dispOrders = this.orders.filter( orderItem => orderItem.id.includes(this.search));

  }

  getAvailableModes(): Array<string>{
    const modes = [];
    this.orders.map(orderItem => {
       if (!modes.includes(orderItem.mode)){
         modes.push(orderItem.mode);
       }
    });
    return modes;
  }

  getAvailableStates(): Array<string>{
    const states = [];
    this.orders.map(orderItem => {
       if (!states.includes(orderItem.state)){
         states.push(orderItem.state);
       }
    });
    return states;
  }

  alterModeFilterItem(modeItem): void{
    const index = this.modefilters.indexOf(modeItem);
    if (index > -1) {
        this.modefilters.splice(index, 1);
    }
    else{
      this.modefilters.push(modeItem);
    }
    if (this.modefilters.length === 0 && this.statefilters.length === 0){
      this.dispOrders = this.orders;
    }
    else{
      this.dispOrders = this.orders.filter( orderItem => this.modefilters.includes(orderItem.mode));
    }
  }

  alterStateFilterItem(stateItem): void{
    const index = this.statefilters.indexOf(stateItem);
    if (index > -1) {
        this.statefilters.splice(index, 1);
    }
    else{
      this.statefilters.push(stateItem);
    }
    if (this.modefilters.length === 0 && this.statefilters.length === 0){
      this.dispOrders = this.orders;
    }
    else{
      this.dispOrders = this.orders.filter( orderItem => this.statefilters.includes(orderItem.state));
    }
  }

}
