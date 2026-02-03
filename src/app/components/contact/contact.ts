
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import emailjs from '@emailjs/browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  private readonly RESET_TIMEOUT = 4000;
  isSent = false;

  async sendEmailJS(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const templateParams = {
      user_email: form.value.user_email,
      subject: form.value.subject,
      message: form.value.message
    };

    try {

      await emailjs.send(
        environment.emailjs.serviceID,
        environment.emailjs.templateID,
        templateParams,
        environment.emailjs.publicKey
      );

      this.isSent = true;

      setTimeout(() => {
        this.isSent = false;
        form.resetForm();
      }, this.RESET_TIMEOUT);

    } catch (error) {
      alert('Error en la transmisión.');
      throw error;
    }
  }
}
