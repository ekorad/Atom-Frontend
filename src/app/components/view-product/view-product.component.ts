import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Review } from './../../models/review';
import { ReviewService } from './../../services/review.service';
import { FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  selectedProduct!: Product;
  reviewForm = this.fb.group({
    mark: ['', { validators: Validators.required, updateOn: 'blur' }],
    review: ['', { validators: Validators.required, updateOn: 'blur' }]
  });
  readonly marks = [1, 2, 3, 4, 5];
  @ViewChild('revForm', { static: false }) reviewMatForm!: NgForm;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params.id;
      this.productService.getById(id)
        .subscribe(product => {
          if (!product) {
            this.router.navigateByUrl('/');
          }
          this.selectedProduct = product;
        },
          err => console.log(err),
          () => {
            this.selectedProduct.reviews = this.selectedProduct.reviews.sort((rev1, rev2) => {
              const d1 = new Date(rev1.date);
              const d2 = new Date(rev2.date);
              return d2.getTime() - d1.getTime();
            });
          });
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get mark(): FormControl {
    return this.reviewForm.get('mark') as FormControl;
  }
  get review(): FormControl {
    return this.reviewForm.get('review') as FormControl;
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review: Review = {
        id: 0,
        review: this.review.value,
        grade: this.mark.value,
        productId: this.selectedProduct.id,
        date: new Date(Date.now())
      };
      this.reviewService.addReview(review)
        .subscribe(stuff => { },
          error => {
            console.log(error);
            this.reviewMatForm.resetForm();
          },
          () => {
            this.reviewMatForm.resetForm();
          });
    }
  }

  getAverageReview(): number | null {
    if (!this.selectedProduct.reviews.length) {
      return null;
    }

    const avg = this.selectedProduct.reviews.map(review => review.grade)
      .reduce((prev, crt) => prev + crt, 0) / this.selectedProduct.reviews.length;

    return avg;
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId);
  }

}
