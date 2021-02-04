import { ShoppingCartService } from './../../services/shopping-cart.service';
import { PartialObserver } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  private readonly productObserver: PartialObserver<Product[]> = {
    next: recvProds => this.dataSource.data = recvProds,
    complete: () => {
      this.productsLoading = false;
    }
  };

  dataSource = new MatTableDataSource<Product>();
  productsLoading = false;

  constructor(private productService: ProductService,
    private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productsLoading = true;
    this.productService.getAll().subscribe(this.productObserver);
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }

}
