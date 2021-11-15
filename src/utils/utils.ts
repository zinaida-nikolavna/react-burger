export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name: string, value: string, props?: any ) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
  }

  // функция форматирования даты
export function getDateTime(date: string) {
  const parseDate =  new Date(Date.parse(date));
  const nowDate = new Date();
  const delta = nowDate.getTime()-parseDate.getTime();

  const options: any = { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
  const res = new Intl.DateTimeFormat('ru-RU', options).format(parseDate);

  const daysFromNow = Math.floor(delta/1000/60/60/24);
  switch (daysFromNow) {
      case 0:
          return `Сегодня, ${res}`;
      case 1:
          return `Вчера, ${res}`;
      case 2:
      case 3:
      case 4:
          return `${daysFromNow} дня назад, ${res}`;
      default: 
          return `${daysFromNow} дней назад, ${res}`;      
  }
}