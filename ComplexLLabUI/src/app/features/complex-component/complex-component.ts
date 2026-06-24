import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComplexService } from './service/complex-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComplexNumber, ComplexRequestDTO } from './models/complex-number.model';

@Component({
  selector: 'app-complex-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complex-component.html',
  styleUrls: ['./complex-component.css'],
})
export class ComplexComponent implements OnInit {

  form: FormGroup;

  constructor(private complexService : ComplexService, private fb : FormBuilder, private cdr: ChangeDetectorRef){
    this.form  = this.fb.group({
      realA: [0],
      imagA: [0],
      realB: [0],
      imagB: [0]
    });
  }

  result: ComplexNumber | null = null;
  history: string[] = [];
  zoom = 20;

  @ViewChild('graph', { static: true }) graph!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.drawGraph();
  }

  private buildRequest(): ComplexRequestDTO {
    return {
      first: { real: this.form.value.realA!, imaginary: this.form.value.imagA! },
      second: { real: this.form.value.realB!, imaginary: this.form.value.imagB! }
    };
  }

  add(){
    const request = this.buildRequest();
    this.complexService.sum(request).subscribe(res => {
    this.result = res;
    this.history.push(`A + B = ${res.real} + ${res.imaginary}i`);
    this.drawGraph();
    this.cdr.detectChanges();
  });
}
  

  sub(){
   const request = this.buildRequest();
    this.complexService.substract(request).subscribe(res => {
    this.result = res;
    this.history.push(`A - B = ${res.real} + ${res.imaginary}i`);
    this.drawGraph();
    this.cdr.detectChanges();
    });
  }

  mul(){
     const request = this.buildRequest();
        this.complexService.multiply(request).subscribe(res => {
        this.result = res;
        this.history.push(`A × B = ${res.real} + ${res.imaginary}i`);
        this.drawGraph();
        this.cdr.detectChanges();
        });
  }

  div(){
         const request = this.buildRequest();
            this.complexService.divide(request).subscribe(res => {
            this.result = res;
            this.cdr.detectChanges();
            this.history.push(`A ÷ B = ${res.real} + ${res.imaginary}i`);
            this.drawGraph();
            });
  }

  conjugateA(){
    this.result = { real: this.form.value.realA, imaginary: -this.form.value.imagA };
     this.resultText();
    this.history.push(`conj(A) = ${this.result.real} + ${this.result.imaginary}i`);
    this.drawGraph();
  }

  conjugateB(){
    this.result = { real: this.form.value.realB, imaginary: -this.form.value.imagB };
     this.resultText();
    this.history.push(`conj(B) = ${this.result.real} + ${this.result.imaginary}i`);
    this.drawGraph();
  }

  magnitudeA(){
    const mag = Math.hypot(this.form.value.realA, this.form.value.imagA);
     this.resultText();
    this.history.push(`|A| = ${mag}`);
    this.result = { real: mag, imaginary: 0 };
  }
  magnitudeB(){
    const mag = Math.hypot(this.form.value.realB, this.form.value.imagB);
     this.resultText();
    this.history.push(`|B| = ${mag}`);
    this.result = { real: mag, imaginary: 0 };
  }

  toPolarA(){
    const r = Math.hypot(this.form.value.realA, this.form.value.imagA);
    const theta = Math.atan2(this.form.value.imagA, this.form.value.realA);
    this.resultText();
    this.history.push(`A polar: r=${r}, θ=${theta}`);
    this.result = { real: r, imaginary: theta };
  }
  toPolarB(){
    const r = Math.hypot(this.form.value.realB, this.form.value.imagB);
    const theta = Math.atan2(this.form.value.imagB, this.form.value.realB);
    this.resultText();
    this.history.push(`B polar: r=${r}, θ=${theta}`);
    this.result = { real: r, imaginary: theta };
  }


  resultText(){
    return this.result ? `${this.result.real} + ${this.result.imaginary}i` : '';
  }

  zoomIn() { this.zoom *= 1.2; this.drawGraph(); }
  zoomOut() { this.zoom /= 1.2; this.drawGraph(); }
  resetView() { this.zoom = 50; this.drawGraph(); }


   drawGraph() {
    const ctx = this.graph.nativeElement.getContext('2d')!;
    ctx.clearRect(0, 0, 600, 500);

    const originX = 300; 
    const originY = 250; 
    const step = this.zoom; 

    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    for (let x = originX; x <= 600; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 500);
      ctx.stroke();
    }
    for (let x = originX; x >= 0; x -= step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 500);
      ctx.stroke();
    }

    for (let y = originY; y <= 500; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }

    for (let y = originY; y >= 0; y -= step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, 500);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(600, originY);
    ctx.stroke();

    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = originX + step; x < 600; x += step) {
      ctx.fillText(`${Math.round((x - originX) / step)}`, x, originY + 4);
    }
    for (let x = originX - step; x > 0; x -= step) {
      ctx.fillText(`${Math.round((x - originX) / step)}`, x, originY + 4);
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = originY - step; y > 0; y -= step) {
      ctx.fillText(`${Math.round((originY - y) / step)}`, originX - 4, y);
    }
    for (let y = originY + step; y < 500; y += step) {
      ctx.fillText(`${Math.round((originY - y) / step)}`, originX - 4, y);
    }

    const A = { x: Number(this.form.value.realA), y: Number(this.form.value.imagA) };
    const B = { x: Number(this.form.value.realB), y: Number(this.form.value.imagB) };

    const drawPoint = (x: number, y: number, color: string, label: string) => {
      const px = originX + x * step;
      const py = originY - y * step;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      if (!(x === 0 && y === 0)) {
            ctx.fillText(`${label} (${x}, ${y})`, px + 8, py - 8);
        }
    };

    ctx.strokeStyle = '#1e88e5';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + A.x * step, originY - A.y * step);
    ctx.stroke();
    drawPoint(A.x, A.y, '#1e88e5', 'A');

    ctx.strokeStyle = '#43a047';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + B.x * step, originY - B.y * step);
    ctx.stroke();
    drawPoint(B.x, B.y, '#43a047', 'B');

    // Draw result
    if (this.result) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + this.result.real * step, originY - this.result.imaginary * step);
      ctx.stroke();
      ctx.lineWidth = 1;
      drawPoint(this.result.real, this.result.imaginary, 'red', 'R');
    }
  }
}
