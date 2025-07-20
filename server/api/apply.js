import nextConnect from "next-connect";
import multer from "multer";
import { sendEmail } from "../lib/sendEmail";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Ошибка: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Метод ${req.method} не поддерживается` });
  },
});

apiRoute.use(upload.single("resume"));

apiRoute.post(async (req, res) => {
  const data = {
    ...req.body,
    resume: req.file,
  };
  await sendEmail(data);
  res.json({ ok: true });
});

export default apiRoute;
export const config = { api: { bodyParser: false } };
