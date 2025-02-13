import { CanDeactivateFn } from '@angular/router';
import { UserFormComponent } from '../components/user-form/user-form.component';


export const CanLeaveGuard: CanDeactivateFn<UserFormComponent> = (component) => {
    if (component.userForm.dirty) {
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }

