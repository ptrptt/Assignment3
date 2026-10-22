# Assignment 3: Automated Testing with Playwright

โปรเจกต์นี้เป็นงานฝึกเขียน Automated Test ด้วย Playwright และ TypeScript เพื่อทดสอบการ Checkout ของเว็บ SauceDemo และการคำนวณราคารวมของเว็บ Coffee Shop

## เว็บไซต์ที่ใช้ทดสอบ

- [SauceDemo](https://www.saucedemo.com/)
- [Coffee Shop](https://seleniumbase.io/coffee/)

## กรณีทดสอบ

### SauceDemo

เลือก 3 กรณีจากไฟล์ `SauceDemo (Test Cases).xlsx` และเพิ่มการตรวจสอบ Guest checkout รวมเป็น 4 กรณี

| Test Case | สิ่งที่ทดสอบ | ผลลัพธ์ที่คาดหวัง |
| --- | --- | --- |
| Guest checkout | เข้าหน้า Checkout โดยไม่ล็อกอิน | กลับหน้า Login และแสดงข้อความว่าต้องเข้าสู่ระบบก่อน |
| TC-CKO-001 | กดปุ่ม Checkout จากตะกร้า | ไปหน้า Checkout: Your Information |
| TC-CKO-003 | ไม่กรอกข้อมูลแล้วกด Continue | แสดงข้อความ Error: First Name is required |
| TC-CKO-012 | กรอกข้อมูลและกด Finish ที่หน้า Overview | ไปหน้า Checkout: Complete! และแสดง Thank you for your order! |

SauceDemo ต้องเข้าสู่ระบบก่อนสั่งซื้อ กรณี Guest checkout ในงานนี้จึงตรวจสอบการป้องกันการเข้าถึงหน้าดังกล่าว ส่วนอีก 3 กรณีใช้บัญชีทดสอบของเว็บไซต์ `standard_user` และรหัสผ่าน `secret_sauce`

### Coffee Shop

อ้างอิง 3 กรณีจาก [Coffee Shop Testing](https://docs.google.com/spreadsheets/d/1CSxs4LENbHXYSmeg92bwxCnIFyTffXY_NT1xRYzFhS8/edit?usp=sharing)

| Test Case | สินค้าที่เลือก | ราคารวมที่คาดหวัง |
| --- | --- | --- |
| Coffee_001 | Cafe Latte 1 แก้ว | $16.00 |
| Coffee_002 | Mocha, Flat White และ Cappuccino อย่างละ 1 แก้ว | $45.00 |
| Coffee_003 | Americano 2 แก้ว โดยเพิ่มจำนวนในตะกร้า | $14.00 |

## ไฟล์หลัก

```text
tests/
  saucedemo.spec.ts    # ทดสอบ Checkout ของ SauceDemo
  coffeeshop.spec.ts   # ทดสอบราคารวมของ Coffee Shop
playwright.config.ts  # ตั้งค่าการรันทดสอบและเบราว์เซอร์
```

## วิธีติดตั้ง

ติดตั้ง Node.js และ npm ก่อน จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรัน

```bash
npm ci
npx playwright install
```

## วิธีรันทดสอบ

รันทั้งหมดบน Chromium, Firefox และ WebKit ตามที่ตั้งค่าไว้ รวม 7 กรณี × 3 เบราว์เซอร์ = 21 รายการ

```bash
npx playwright test
```

รันแยกตามเว็บไซต์

```bash
npx playwright test tests/saucedemo.spec.ts
npx playwright test tests/coffeeshop.spec.ts
```

รันเฉพาะ Chromium พร้อมเปิดหน้าต่างเบราว์เซอร์เพื่อดูขั้นตอน

```bash
npx playwright test --project=chromium --headed
```

## ดูผลการทดสอบ

เมื่อรันเสร็จ สามารถเปิดรายงาน HTML ได้ด้วยคำสั่ง

```bash
npx playwright show-report
```

การทดสอบต้องเชื่อมต่ออินเทอร์เน็ต เนื่องจากเรียกใช้งานเว็บไซต์จริง ผลลัพธ์อาจเปลี่ยนแปลงเมื่อเว็บไซต์มีการปรับปรุง
