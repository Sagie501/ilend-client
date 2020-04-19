import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'ile-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  products$: Observable<Array<Product>> = this.productsService.getProducts();
  constructor(private productsService: ProductsService, private userService: UserService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res) => {
      console.log(res);
    });

    this.userService.login('Sagie012@gmail.com', '123456').subscribe((res) => {
      console.log(res);
    });
  }
}
