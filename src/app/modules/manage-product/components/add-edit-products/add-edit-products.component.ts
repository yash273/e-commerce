import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { category } from 'src/shared/constants/category';
import { price } from 'src/shared/constants/regex-rule';
import { ManageProductService } from '../../service/manage-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/shared/services/shared.service';
import { MediaMatcher } from '@angular/cdk/layout';

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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(
    private formBuilder: FormBuilder,
    private manageProductService: ManageProductService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher

  ) {

    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.createForm();
    this.productId = this.route.snapshot.params['id'];
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
      this.manageProductService.saveProduct(formData).subscribe(
        (res) => {
          if (res) {
            this.sharedService.showAlert("product added", "success");
            this.router.navigate(['/all-products']);
          }
        },
        (error) => {
          this.sharedService.showAlert("Error in adding product ", "error");
          console.error(error);
        }
      );
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", "error");
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };
      formData.price = Number(formData.price);
      this.manageProductService.updateProduct(formData, this.productId).subscribe(
        (res) => {
          if (res) {
            this.sharedService.showAlert("product updated", "success");
            this.router.navigate(['/all-products']);
          }
        },
        (error) => {
          this.sharedService.showAlert("Error in Updating product ", "error");
          console.error(error);
        });
    } else {
      this.sharedService.showAlert("Form is invalid. Please check the fields.", "error");
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
