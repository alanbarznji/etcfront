import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Check, Star, Award, Zap } from "lucide-react";

const Offers = ({packages}) => {
  const { t, i18n } = useTranslation();
  
 console.log(packages,"dsddddddddddd");
 

  // Get status-specific styling
  const getPackageStyles = (status) => {
    switch(status) {
      case 'Professional':
        return {
          cardClass: "bg-gradient-to-br from-amber-500 to-yellow-600 shadow-amber-200/50",
          icon: <Star className="w-5 h-5" />,
          textColor: "text-white",
          buttonClass: "bg-white text-amber-600 hover:bg-amber-50"
        };
      case 'Enterprise':
        return {
          cardClass: "bg-gradient-to-br from-purple-600 to-indigo-700 shadow-indigo-200/50",
          icon: <Award className="w-5 h-5" />,
          textColor: "text-white",
          buttonClass: "bg-white text-indigo-600 hover:bg-indigo-50"
        };
      default:
        return {
          cardClass: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200/50",
          icon: <Zap className="w-5 h-5" />,
          textColor: "text-white",
          buttonClass: "bg-white text-blue-600 hover:bg-blue-50"
        };
    }
  };

  return (
    <section className="py-16">
      <div
        style={{
          fontFamily: i18n.language === "ar" ? "Cairo, sans-serif" : "",
        }}
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {t("Packages")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("Tailored_plans_to_fit_your_needs")}
          </p>
        </div>

        <div
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
        >
          {packages?.map((pkg) => {
            console.log(pkg,"starter");
            
            const styles = getPackageStyles(pkg.state);
            
            return (
              <div 
                key={pkg._id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${styles.cardClass} shadow-xl w-full`}
              >
                {pkg.state=="Professional" && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs font-semibold bg-white text-blue-600 py-1 px-4 rounded-bl-lg shadow-md">
                      {"most popular"}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-white/20 mr-3">
                      {styles.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${styles.textColor}`}>
                      {pkg.Name}
                    </h3>
                  </div>
                  
                  <p className={`text-sm ${styles.textColor} opacity-90 mb-6 break-words`}>
                    { pkg.Details}
                  </p>
                  
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${styles.textColor}`}>
                      {pkg.Price} IQD
                    </span>
                  </div>
                  
                  <Link
                    to={`package/${pkg._id}`}
                    className={`block w-full py-3 px-4 rounded-xl text-center font-medium ${styles.buttonClass} shadow-lg transition-colors duration-200`}
                  >
                    buy
                  </Link>
                  <div className="mt-6">
<p className=" font-bold text-white">product</p>
                  <ul className={`mt-8 space-y-4 ${styles.textColor}`}>
                    {pkg?.ProductOfOffer?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${styles.textColor}`}>{feature.Products?.Name}</span>
                      </li>
                    ))}
                  </ul>
                    </div>
                  <div className="mt-6">
<p className=" font-bold text-white">printer</p>
                  <ul className={`mt-8 space-y-4 ${styles.textColor}`}>
                    {pkg?.PrinterOfOffer?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${styles.textColor}`}>{feature.Printer?.Name}</span>
                      </li>
                    ))}
                  </ul>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offers;