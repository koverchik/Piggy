import { observer } from 'mobx-react-lite';
import React from 'react';

import './_Footer.scss';

const Footer: React.FC = observer(() => {
  return (
    <div className="wrapper-footer">
      <div className="links-info">
        <a href="#">Правила</a>
        <a href="#">О правах</a>
        <a href="mailto:koverchik.o@gmail.com?subject=Вопрос по Piggy">
          Связаться
        </a>
      </div>
    </div>
  );
});

export default Footer;
