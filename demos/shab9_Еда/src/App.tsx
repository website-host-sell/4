import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const phrases = [
    'вкусная кухня',
    'быстрая доставка',
    'качественные ингредиенты'
  ];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let currentIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting && currentIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, currentIndex));
        currentIndex++;
        timer = setTimeout(type, 100);
      } else if (!isDeleting && currentIndex > currentPhrase.length) {
        timer = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
      } else if (isDeleting && currentIndex >= 0) {
        setTypedText(currentPhrase.slice(0, currentIndex));
        currentIndex--;
        timer = setTimeout(type, 50);
      } else if (isDeleting && currentIndex < 0) {
        isDeleting = false;
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    timer = setTimeout(type, 200);
    return () => clearTimeout(timer);
  }, [phraseIndex]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-bold text-xl text-gray-900"
            >
              Парадокс
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'О нас', id: 'hero' },
                { name: 'Фото', id: 'photos' },
                { name: 'Отзывы', id: 'reviews' },
                { name: 'Статистика', id: 'counter' },
                { name: 'Время работы', id: 'schedule' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, color: '#6b7280' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { name: 'О нас', id: 'hero' },
                  { name: 'Фото', id: 'photos' },
                  { name: 'Отзывы', id: 'reviews' },
                  { name: 'Статистика', id: 'counter' },
                  { name: 'Время работы', id: 'schedule' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* S1 - Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 right-20 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-30"
        />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-12"
          >
            Парадокс
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-600 h-16 mb-16"
          >
            Готовы {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-1 h-8 bg-gray-900 ml-1"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
            className="px-12 py-5 bg-gray-900 text-white rounded-2xl text-lg font-medium hover:bg-gray-800 transition-colors shadow-xl"
          >
            Узнать больше
          </motion.button>
        </div>
      </section>

      {/* S2 - About Us */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            О нас
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ресторан Парадокс</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Добро пожаловать в ресторан корейской кухни Парадокс! Мы предлагаем автентичные блюда корейской кухни, приготовленные из свежих качественных ингредиентов. Наша команда предоставляет быструю доставку и отличный сервис.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">Адрес:</span>
                  <span className="text-gray-600">ул. М. Горького, 22А, Череповец</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-900 font-medium mr-2">Телефон:</span>
                  <span className="text-gray-600">+7 (900) 536-80-15</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Наши преимущества</h3>
              <ul className="space-y-3 text-gray-600">
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <span className="text-gray-900 mr-2">•</span>
                  Вкусная корейская кухня
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <span className="text-gray-900 mr-2">•</span>
                  Быстрая доставка
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <span className="text-gray-900 mr-2">•</span>
                  Качественные ингредиенты
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <span className="text-gray-900 mr-2">•</span>
                  Отзывчивый персонал
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S3 - Photos */}
      <section id="photos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Фото
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'https://avatars.mds.yandex.net/get-vh/3245173/2a000001911dbbea5010a380fee2e09fb5ca/1080x1920q15',
              'https://avatars.mds.yandex.net/get-altay/13061180/2a0000018ebaa53560b9dfc8acc6b90ce5e2/XXXL',
              'https://avatars.mds.yandex.net/get-vh/4910452/2a000001911dbbea4d11ecc537a289c7be0a/orig',
              'https://avatars.mds.yandex.net/get-altay/11444509/2a0000018ebaa40cae7f95e1dc0df748d885/XXXL',
              'https://avatars.mds.yandex.net/get-vh/4447018/2a000001911c9d744011628a50bafbae144d/smart_crop_500x500',
              'https://avatars.mds.yandex.net/get-vh/6919792/2a0000018ef5d72adc60202bec0e768587e5/smart_crop_500x500'
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                className="rounded-2xl shadow-lg overflow-hidden aspect-square"
              >
                <img src={img} alt={`Фото ${index + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* S5 - Reviews */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Отзывы
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Дмитрий Ш.', text: 'Очень! Очень понравилось 👍👍👍 Дети были настолько в восторге, что минут 20 за стол не могли усадить. Да и сами как дети всё разглядывали и изучали) Полное ощущение что попал в параллельный мир стимпанка)', initial: 'Т' },
              { name: 'Максим К.', text: 'Очень понравился ресторан, удивлен необычной атмосферой (она не отпугивает)! Вкусная еда, большой выбор блюд. Детям принесли настольные игры (мы не просили). Официант предложила караоке (в меню нигде про караоке не сказано было), приятно…Ещё', initial: 'А' },
              { name: 'Максим Денисов', text: 'Очень интересный и необычный бар. 1. Необычная обстановка. 2. Большой выбор странных, но вкусных коктейлей. 3. Неплохая кухня. 4. Очень комфортное обслуживание. 5. Забронировать столик нельзя, но обычно место есть. 6. Не самое проходное место. 7. Средний чек за два…Ещё', initial: 'V' },
              { name: 'Евгения Бондарева', text: 'Зашли сюда совершенно случайно и были приятно удивлены, очень атмосферно! Очень необычно, есть что поразглядывать, интересно и детям и взрослым. Всё вкусно, всё понравилось!! Спасибо Татьяне за грамотное и вежливое обслуживание, отдельное спасибо Арсению за…Ещё', initial: 'И' },
              { name: 'ОбЖор Григорьева | гастропрогулки', text: 'Интересный бар с кокотейльной картой в виде комикса. Подача каждого в отдельной посуде. Деталей в интерьере много, в том числе собранных по заказу.…Ещё', initial: 'Е' },
              { name: '[ИМЯ_КЛИЕНТА_6]', text: '[ТЕКСТ_ОТЗЫВА_6]', initial: 'С' }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700"
                  >
                    {review.initial}
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S6 - Counter */}
      <section id="counter" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Статистика
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '274', label: 'Отзывов от клиентов' },
              { value: '5,0', label: 'Рейтинг' },
              { value: '100%', label: 'Качество' },
              { value: '1000+', label: 'Довольных клиентов' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S7 - Operating Mode */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Время работы
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <div className="space-y-4">
              {[
                { day: 'Понедельник', time: 'закрыто', closed: false },
                { day: 'Вторник', time: 'закрыто', closed: false },
                { day: 'Среда', time: '15:00-00:00', closed: false },
                { day: 'Четверг', time: '15:00-00:00', closed: false },
                { day: 'Пятница', time: '15:00-02:00', closed: false },
                { day: 'Суббота', time: '14:00-02:00', closed: false },
                { day: 'Воскресенье', time: '14:00-00:00', closed: false }
              ].map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 10, backgroundColor: '#f9fafb' }}
                  className="flex justify-between items-center p-4 rounded-xl transition-colors"
                >
                  <span className="font-medium text-gray-900">{schedule.day}</span>
                  <span className={schedule.closed ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                    {schedule.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* S8 - Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-4"
          >
            Парадокс
          </motion.div>
          <div className="text-gray-400 space-y-2">
            <p>ул. М. Горького, 22А, Череповец</p>
            <p>+7 (900) 536-80-15</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
