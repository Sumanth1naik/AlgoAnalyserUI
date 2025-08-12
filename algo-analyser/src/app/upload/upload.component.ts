import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UploadService } from '../services/upload.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  strategyName: string = '';
  selectedFile: File | null = null;
  uploadStatus: string = '';

  constructor(private uploadService: UploadService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('✅ UploadComponent Loaded');
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  onUpload(): void {
    console.log('Uploading...');
    if (!this.selectedFile || !this.strategyName) {
      this.uploadStatus = '⚠️ Please provide both strategy name and CSV file.';
      return;
    }

    const formData = new FormData();
    formData.append('strategy_name', this.strategyName);
    formData.append('file', this.selectedFile);

    this.uploadStatus = 'Uploading...';

    this.uploadService.uploadFile(formData).subscribe({
      next: (res) => {
        console.log('✅ Upload successful:', res);
        this.uploadStatus = '✅ Upload successful!';
         this.cdr.markForCheck();
        console.log('✅ Status updated to:', this.uploadStatus);
        this.strategyName = '';
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('❌ Upload error:', err);
        this.uploadStatus = '❌ Upload failed.';
      }
    });
  }
}
