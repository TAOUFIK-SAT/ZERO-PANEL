/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON request processing
  app.use(express.json());

  // API Route - Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route - Gemini Smart Sports AI Analyst
  app.post('/api/gemini/analyze', async (req, res) => {
    const { matchInfo, userPrompt } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === '') {
      return res.status(403).json({
        error: 'لم يتم العثور على مفتاح API الخاص بـ Gemini في إعدادات الخادم. يرجى تكوين مفتاح GEMINI_API_KEY في لوحة الإعدادات (Secrets) أولاً.'
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `أنت المحلل الرياضي الذكي الحصري والشهير لتطبيق "توفيق تيفي (TAOUFIK TV)".
        مهمتك هي تقديم تحليل تكتيتي ثاقب وتوقع رياضي دقيق ومشوق للمباراة باللغة العربية، وبأسلوب معلقي كرة القدم العرب الحماسيين (مثل عصام الشوالي، حفيظ دراجي، خليل البلوشي وفهد العتيبي).
        
        تفاصيل وأطراف المباراة الحالية للقراءة والتحليل: 
        ${JSON.stringify(matchInfo, null, 2)}
        
        سؤال أو تفضيل المشجع: 
        ${userPrompt || 'توقع مجريات المباراة التكتيكية، دور النجوم المفاتيح، والنتيجة النهائية بدقة ومبررة.'}
        
        يجب أن يحتوي ردك على:
        1. شق تكتيكي وتجهيزات الفريقين وأبرز الأوراق ال رابحة.
        2. تحليل لتشكيلة اللعب إن وجدت أو المترقبة.
        3. توقع النتيجة الرقمية المناسبة مع حكاية مشوقة لكيفية تسجيل الأهداف وأسلوب ممتع مليء بالمصطلحات العربية الأصيلة مثل (يوزعععع، يا ربااااه، غدار غدار، المستديرة الساحرة، الكامب نو، البرنابيو، مدرج الذهب).
        4. يفضل وضع النتيجة المتوقعة في نهاية التحليل بشكل بارز وجميل.`
      });

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error('Gemini API Invocation Error:', error);
      res.status(500).json({
        error: error.message || 'حدث خطأ أثناء الاتصال بالذكاء الاصطناعي Gemini للتحليل الفني.'
      });
    }
  });

  // Vite Developer middleware or Static Production Assets Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve client files
    app.use(express.static(distPath));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Taoufik Server] Server running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('[Taoufik Server] Failed to bootstrap the express dev server:', error);
});
