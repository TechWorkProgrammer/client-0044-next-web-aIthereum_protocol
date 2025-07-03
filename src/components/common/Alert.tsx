import React from 'react';
import {AlertInterface} from '@/context/Alert';
import {
    FaCheckCircle,
    FaInfoCircle,
    FaExclamationTriangle,
    FaTimes,
} from 'react-icons/fa';

interface Props {
    alerts: AlertInterface[];
    removeAlert: (id: string) => void;
}

const Alert: React.FC<Props> = ({alerts, removeAlert}) => (
    <div
        className="fixed bottom-8 right-5 left-5 left-auto ml-5 md:right-8 flex flex-col gap-4 z-[9999] max-w-xl mx-0"
    >
        {alerts.map((alert) => {
            const getStyles = () => {
                switch (alert.type) {
                    case 'success':
                        return {
                            bg: 'bg-green-600/10',
                            border: 'border-green-600',
                            textColor: 'text-green-600',
                            Icon: FaCheckCircle,
                        };
                    case 'error':
                        return {
                            bg: 'bg-red-700/10',
                            border: 'border-red-700',
                            textColor: 'text-red-700',
                            Icon: FaExclamationTriangle,
                        };
                    case 'warning':
                        return {
                            bg: 'bg-yellow-700/10',
                            border: 'border-yellow-700',
                            textColor: 'text-yellow-700',
                            Icon: FaExclamationTriangle,
                        };
                    case 'info':
                    default:
                        return {
                            bg: 'bg-secondary-700/80',
                            border: 'border-white',
                            textColor: 'text-white',
                            Icon: FaInfoCircle,
                        };
                }
            };

            const {bg, border, textColor, Icon} = getStyles();

            return (
                <div
                    key={alert.id}
                    className={`relative flex items-start gap-3 px-4 py-2 pr-8 rounded shadow-lg border-2 transition-transform duration-500 ease-in-out transform ${alert.visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'} ${bg} ${border} text-white`}
                >
                    <div className="flex-shrink-0 mt-1">
                        <Icon className={`w-6 h-6 ${textColor}`}/>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <p className="text-sm md:text-xl font-semibold text-white">
                            {alert.title}
                        </p>
                        <p className="text-sm md:text-md mt-1 break-words max-w-[300px] md:min-w-[280px] sm:max-w-full overflow-hidden text-ellipsis text-white">
                            {alert.message}
                        </p>
                    </div>

                    <button
                        onClick={() => removeAlert(alert.id)}
                        className={`${textColor} absolute top-2 right-2 hover:opacity-80 transition-opacity`}
                    >
                        <FaTimes className="w-4 h-4"/>
                    </button>
                </div>
            );
        })}
    </div>
);

export default Alert;
