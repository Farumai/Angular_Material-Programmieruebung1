import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Registration } from '../../shared/Interfaces/Registration';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatIconModule, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})

export class DataComponent {

  activeSort: 'asc' | 'desc' | null = null;

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getRegistrations(this.storeService.currentPage);
  }

  cancelRegistration(registration: Registration): void {
    if (confirm('Sind Sie sicher, dass Sie diese Registrierung löschen möchten?')) {
      registration.isDeleting = true;
      this.backendService.deleteRegistration(registration.id).subscribe({
        next: () => {
          registration.isDeleting = false;
          this.storeService.registrations = this.storeService.registrations.filter(
            (reg) => reg.id !== registration.id
          );
        },
        error: () => {
          registration.isDeleting = false;
          alert('Die Registrierung konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.');
        }
      });
    }
  }

  sortRegistrations(order: 'asc' | 'desc'): void {
    this.activeSort = order;
    this.storeService.sortOrder = order;
    this.backendService.getRegistrations(this.storeService.currentPage);
  }

  loadRegistrations(page: number): void {
    this.backendService.getRegistrations(page);
  }

  selectPage(event: PageEvent): void {
    this.loadRegistrations(event.pageIndex + 1);
  }

  returnAllPages(): number[] {
    const pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }  
}