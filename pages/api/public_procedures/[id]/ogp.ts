import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProcedureFormProps } from '../../../../types/Procedure';
import {
  createCanvas,
  registerFont,
  loadImage,
  CanvasRenderingContext2D,
} from 'canvas';
import * as path from 'path';
import '../../../../lib/firebase_admin';

type SeparatedText = {
  line: string;
  remaining: string;
};

function createTextLine(
  context: CanvasRenderingContext2D,
  text: string
): SeparatedText {
  const maxWidth = 400;

  for (let i = 0; i < text.length; i++) {
    const line = text.substring(0, i + 1);
    if (context.measureText(line).width > maxWidth) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: '',
  };
}

function createTextLines(
  context: CanvasRenderingContext2D,
  text: string
): string[] {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== '') {
    const separatedText = createTextLine(context, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }

  return lines;
}

registerFont(path.resolve('./fonts/Senobi-Gothic-Regular.ttf'), {
  family: 'Senobi-Gothic',
});

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json() as Promise<ProcedureFormProps>);

const getOgp = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/public_procedures/${id}`
  );
  const { title } = data;

  const width = 600;
  const height = 315;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  const backgroundImage = await loadImage(
    path.resolve('./images/ogp_background.png')
  );
  context.drawImage(backgroundImage, 0, 0, width, height);
  context.font = '20px Senobi-Gothic';
  context.fillStyle = '#020202';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const lines = createTextLines(context, title);
  lines.forEach((line, index) => {
    const y = 157 + 40 * (index - (lines.length - 1) / 2);
    context.fillText(line, 300, y);
  });

  const buffer = canvas.toBuffer();

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'binary');
};

export default getOgp;
