import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { category } from 'src/shared/constants/category';
import { price } from 'src/shared/constants/regex-rule';
import { ManageProductService } from '../../service/manage-product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  productForm !: FormGroup;
  categories = category;
  productId!: number;
  imageArray: { url: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private manageProductService: ManageProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.populateForm();
  }

  createForm() {
    return this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(price)]],
      category: ['', [Validators.required]],
      sold_by: ['', [Validators.required]],
      images: [[], [Validators.required]]
    });
  }

  populateForm() {
    if (this.productId) {
      this.manageProductService.getProductById(this.productId).subscribe((res: any) => {
        const previousData = res;
        this.imageArray = res.images;
        this.productForm.patchValue(previousData);
      })
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };
      formData.price = Number(formData.price);
      this.manageProductService.saveProduct(formData).subscribe((res) => {
        if (res) {
          console.log("product added")
        }
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };
      formData.price = Number(formData.price);
      this.manageProductService.updateProduct(formData, this.productId).subscribe((res) => {
        if (res) {
          console.log("product Updated");
          this.router.navigate(['/all-products'])
        }
      });
    }
  }


  handleImageInput(event: any) {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageArray.push({ url: e.target.result });
      };
    }
    this.productForm.get('images')?.setValue(this.imageArray);
  }

  removeImage(imageIndex: number) {
    this.imageArray.splice(imageIndex, 1);
    this.productForm.get('images')?.setValue(this.imageArray);
  }

}
