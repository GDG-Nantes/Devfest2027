import React, { useState } from 'react';
import {
  CameraIcon,
  PlayIcon,
  AppleIcon,
  AndroidIcon,
} from '@/components/icons/FlatIcons';

interface HomeJumboProps {
  locale: string;
}

// Static translations to avoid async i18n loading in client component
const translations: Record<string, Record<string, string>> = {
  fr: {
    'come-back': 'Nous serons de retour pour une édition sportive',
    date: 'les 11 et 12 Mars 2027',
    become_sponsor: 'Devenir sponsor',
    exceptional: 'Édition exceptionnelle',
    'thanks-gdg-android':
      "Merci au GDG Nantes Android pour le développement de l'application mobile !",
  },
  en: {
    'come-back': 'Devfest Nantes will be back for a sporty edition',
    date: 'on March 11th and 12th, 2027',
    become_sponsor: 'Become sponsor',
    exceptional: 'Exceptional edition',
    'thanks-gdg-android':
      'Thanks to GDG Nantes Android for developing the mobile app!',
  },
};

const HomeJumbo: React.FC<HomeJumboProps> = ({ locale }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = (key: string) => translations[locale]?.[key] || key;

  return (
    <>
      <div className='jumbo'>
        <div className='jumbo-content'>
          <div className='logo-jumbo-home'>
            <img
              alt='logo'
              src='/images/logo-blanc.svg'
              className='logo-jumbo-home-img'
            />
          </div>

          <div
            className='jumbo-text'
            style={{ maxWidth: '50%', textAlign: 'center' }}
          >
            <h1 style={{ marginTop: '10px', marginBottom: '25px' }}>
              <p>{t('come-back')}</p>
              <p>{t('date')}</p>
            </h1>
          </div>

          <div
            className='jumbo-buttons'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href='#exceptional-info'
                className='jumbo-btn'
              >
                {t('become_sponsor')}
              </a>
              <a
                href='#exceptional-info'
                className='jumbo-btn'
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('exceptional-info')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('exceptional')}
              </a>
            </div>
            <div
              style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
            >
              <a
                href='https://photos.app.goo.gl/H1EqkeCNkjjYMxCCA'
                target='_blank'
                rel='noopener noreferrer'
                className='jumbo-btn'
              >
                <CameraIcon size={16} /> Photos 2025
              </a>
              <a
                href='https://www.youtube.com/watch?v=ZhEMS_6m8PI&list=PLuZ_sYdawLiWvkdETEVYDFjV2ibwJ2E-9&index=4'
                target='_blank'
                rel='noopener noreferrer'
                className='jumbo-btn'
              >
                <PlayIcon size={16} /> Videos 2025
              </a>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className='modal-overlay' onClick={() => setModalOpen(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-body'>
              <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>
                {t('thanks-gdg-android')}
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <a
                  href='https://apps.apple.com/fr/app/devfest-nantes/id6443489706'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='jumbo-btn'
                >
                  <AppleIcon size={16} /> iOS
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=com.gdgnantes.devfest.mobile.androidapp&pcampaignid=web_share'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='jumbo-btn'
                >
                  <AndroidIcon size={16} /> Android
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .jumbo-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background-color: var(--secondary, #e63946);
          color: white;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
          font-size: 0.95rem;
          transition: opacity 0.2s;
        }
        .jumbo-btn:hover {
          opacity: 0.85;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1300;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          width: 700px;
          max-width: 90%;
          padding: 30px;
          border: 1px solid var(--secondary, #e63946);
          border-radius: 7px;
          background-color: var(--primary, #0d1b2a);
          color: white;
        }
        .modal-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default HomeJumbo;
