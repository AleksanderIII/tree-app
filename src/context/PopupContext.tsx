import React, { createContext, useState, ReactNode, useContext } from 'react';

interface IPopupContent {
  header: string;
  body: null | JSX.Element;
  footer: null | JSX.Element;
}

interface IPopupContext {
  isOpen: boolean;
  content: IPopupContent;
  openPopup: (content: IPopupContent) => void;
  closePopup: () => void;
}

const initPopupContent: IPopupContent = {
  header: '',
  body: null,
  footer: null,
};

const PopupContext = createContext<IPopupContext | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<IPopupContent>(initPopupContent);

  const openPopup = (content: IPopupContent) => {
    setContent(content);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setContent(initPopupContent);
  };

  return (
    <PopupContext.Provider value={{ isOpen, content, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('should be in PopupProvider');
  }
  return context;
};
