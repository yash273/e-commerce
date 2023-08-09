import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { category } from 'src/shared/constants/category';
import { price } from 'src/shared/constants/regex-rule';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  productForm !: FormGroup;
  categories = category;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.createForm();
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

  saveProduct() {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };
      formData.price = Number(formData.price);
      console.log(formData)
    }
  }

  imageArray: { url: string }[] = [];

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
