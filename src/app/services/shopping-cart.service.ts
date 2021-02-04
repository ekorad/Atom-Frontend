import { ShoppingCart } from './../helpers/shopping-cart';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly username: string = 'nouser';

  constructor(private authService: AuthService) {
    const localUsername = this.authService.getUsername();
    if (localUsername) {
      this.username = localUsername;
    }
  }

  getCart(): ShoppingCart | null {
    const storageString = 'cart_' + this.username;
    const storedCart = localStorage.getItem(storageString);
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return null;
  }

  storeCart(cart: ShoppingCart): void {
    const storageString = 'cart_' + this.username;
    const cartString = JSON.stringify(cart);
    localStorage.setItem(storageString, cartString);
  }

  addToCart(productId: number): void {
    const storedCart = this.getCart();
    if (storedCart === null) {
      const newCart: ShoppingCart = {
        productIds: [productId]
      };
      this.storeCart(newCart);
    } else {
      storedCart.productIds.push(productId);
      this.storeCart(storedCart);
    }
  }

  countItems(): number {
    const storedCart = this.getCart();
    if (storedCart) {
      return storedCart.productIds.length;
    }
    return 0;
  }

  removeCart(): void {
    const storageString = 'cart_' + this.username;
    localStorage.removeItem(storageString);
  }

}
