import { ShoppingCartService } from './../../services/shopping-cart.service';
import { DataService } from './../../services/data.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  isLoading = false;
  currentUser!: User;
  cartTotalCosts = 0;

  deliveryMethods = [
    { name: 'xCourier', additionalCosts: 25 },
    { name: 'SomeDay', additionalCosts: 15 },
    { name: 'Ridicare de la sediu', additionalCosts: 0 }
  ];
  paymentMethods = [
    'PayBuddy',
    'MisterCard',
    'Ramburs'
  ];

  contactForm = this.fb.group({
    deliveryAddress: ['', { validators: Validators.required }],
    phoneNumber: ['', { validators: Validators.required }]
  });
  paymentDeliveryForm = this.fb.group({
    deliveryMethod: ['', { validators: Validators.required }],
    paymentMethod: ['', { validators: Validators.required }]
  });

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getCurrentUser()
      .subscribe(currUser => this.currentUser = currUser,
        err => console.log(err),
        () => {
          this.isLoading = false;
        });
    this.cartService.computeCartPrice()
      .subscribe(costs => this.cartTotalCosts = costs,
        err => console.log(err),
        () => { });
  }

  get deliveryAddress(): FormControl {
    return this.contactForm.get('deliveryAddress') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.contactForm.get('phoneNumber') as FormControl;
  }

  get deliveryMethod(): FormControl {
    return this.paymentDeliveryForm.get('deliveryMethod') as FormControl;
  }

  get paymentMethod(): FormControl {
    return this.paymentDeliveryForm.get('paymentMethod') as FormControl;
  }

  deliveryMethodGetCost(): number {
    const delMethodControl = this.deliveryMethod;
    if (delMethodControl.value) {
      return delMethodControl.value.additionalCosts;
    }
    return 0;
  }

  getLastStepMessage(): string {
    if (this.paymentMethod.value === 'Ramburs') {
      return 'Plaseaza comanda.';
    } else {
      return 'Mergi mai departe catre operatorul de plata selectat.';
    }
  }

  cartGetCosts(): number {
    return this.cartTotalCosts;
  }

}
