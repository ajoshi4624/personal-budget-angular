import { Component } from '@angular/core';

@Component({
  selector: 'pb-contact',
  standalone: true,
  template: `
    <section class="contact">
      <h2>Contact</h2>
      <p>Questions? Email us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </section>
  `,
  styles: [`
    .contact { background:#fff; padding:1rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.06); }
    h2 { margin:0 0 .5rem; }
  `]
})
export class Contact {}
