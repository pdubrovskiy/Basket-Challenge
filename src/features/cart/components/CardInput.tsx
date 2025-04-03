import { ChangeEvent, FC } from "react";

interface CardInputProps {
  cardNumber: string;
  error: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CardInput: FC<CardInputProps> = ({
  cardNumber,
  error,
  onChange,
}) => {
  return (
    <div className="mt-6 mb-6 flex justify-between items-center">
      <div className="text-blue-500">
        Please enter your 16 digit credit/debit card number:
      </div>
      <div className="relative">
        <input
          type="text"
          value={cardNumber}
          onChange={onChange}
          placeholder="16 digit validated number"
          className={`w-[250px] p-2 border ${
            error ? "border-red-500" : "border-gray-500"
          } rounded`}
          maxLength={16}
        />
        {error && (
          <div className="absolute text-red-500 text-sm mt-1">
            Card number must be 16 digits
          </div>
        )}
      </div>
    </div>
  );
};
