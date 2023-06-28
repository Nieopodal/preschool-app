export interface ContactContent {
  name: string;
  address: string;
  email: string;
  tel: string;
  hrefTel: string;
  facebook: {
    url: string;
    img: {
      src: string;
      alt: string;
    };
  };
}

export const contactContent: ContactContent = {
  address: '',
  email: '',
  facebook: { img: { alt: '', src: '' }, url: '' },
  hrefTel: '',
  name: '',
  tel: '',
};
