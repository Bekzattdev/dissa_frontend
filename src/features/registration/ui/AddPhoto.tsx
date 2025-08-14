import { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../../../shared/ui/Button";

const AddPhoto = () => {
  const { setValue, watch } = useFormContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photos = watch("photo") || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = [...photos, ...files].slice(0, 6);
    setValue("photo", newPhotos);
  };

  const handleTakePhoto = () => {
    alert("Функция камеры будет реализована позже");
    setIsMenuOpen(false);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setValue("photo", newPhotos);
  };

  return (
    <section className="flex flex-col h-full justify-between">
      <h1 className="!mb-6">Добавить свои фото</h1>
      <p className="text-white !mb-8">
        Главное фото будет использоваться как аватар, на нем должно отчетливо
        видно твое лицо
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 row-span-2 aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative">
          {photos[0] ? (
            <>
              <img
                src={URL.createObjectURL(photos[0])}
                alt="Main photo"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removePhoto(0)}
              >
                &times;
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-gray-400 text-4xl"
              onClick={() => setIsMenuOpen(true)}
            >
              +
            </button>
          )}
        </div>

        {Array.from({ length: 5 }).map((_, index) => {
          const photoIndex = index + 1;
          return (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative"
            >
              {photos[photoIndex] ? (
                <>
                  <img
                    src={URL.createObjectURL(photos[photoIndex])}
                    alt={`Photo ${photoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removePhoto(photoIndex)}
                  >
                    &times;
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="text-gray-400 text-4xl"
                  onClick={() => setIsMenuOpen(true)}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Button
        className="absolute text-[#ffffffad] border-2 mt-6 bottom-16"
        onClick={() => setIsMenuOpen(true)}
      >
        Добавить фото
      </Button>

      {isMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-[#0000008b] backdrop-blur-xs bg-opacity-50 flex items-end z-50"
          onMouseDown={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-2xl  !p-2 !px-[16px] flex flex-col items-center"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="w-[36px] h-[4px] bg-[#a7b6c1] rounded-2xl mb-4">
              -
            </div>
            <div className="w-full flex flex-col gap-4 !py-6">
              <button
                type="button"
                className="flex w-full justify-center !p-3 bg-gray-100 rounded-full text-[#0F172A]"
                onClick={() => fileInputRef.current?.click()}
              >
                <span>Выбрать из галереи</span>
              </button>

              <button
                type="button"
                className="flex w-full justify-center !p-3 bg-gray-100 rounded-full text-[#0F172A]"
                onClick={handleTakePhoto}
              >
                <span>Сделать фото</span>
              </button>

              <button
                type="button"
                className="flex w-full justify-center !p-3 text-[#0F172A]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Отмена</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </section>
  );
};

export default AddPhoto;