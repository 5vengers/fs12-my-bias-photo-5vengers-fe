import Button from '../Button/Button';
import CardBtnLayout from './CardBtnLayout';
import CardDescription from './CardDescription';
import CardGrade from './CardGrade';
import CardImage from './CardImage';
import CardInfo from './CardInfo';
import CardInfoLayout from './CardInfoLayout';
import CardMain from './CardMain';
import CardSale from './CardSale';
import CardSaleLayout from './CardSaleLayout';
import CardTitle from './CardTitle';

const Card = Object.assign(CardMain, {
  Image: CardImage,
  Grade: CardGrade,
  Title: CardTitle,
  Button: Button,
  Info: CardInfo,
  Description: CardDescription,
  BtnLayout: CardBtnLayout,
  InfoLayout: CardInfoLayout,
  SaleInfoLayout: CardSaleLayout,
  SaleInfo: CardSale,
});

export default Card;
