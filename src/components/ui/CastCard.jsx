import PropTypes from "prop-types";

const CastCard = ({ casts }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full md:w-[180px]">
      <section className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-[110px] h-[145px] rounded-lg overflow-hidden border border-white shadow-sm">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w185/${casts?.profile_path}`}
            alt={casts?.original_name}
          />
        </div>

        {/* Actor Name */}
        <div className="mt-2 text-center">
          <p className="text-white text-sm md:text-base font-semibold truncate">
            {casts?.original_name}
          </p>
        </div>

        {/* Character Name */}
        <div className="text-gray-400 text-xs md:text-sm truncate text-center">
          <p>{casts?.character}</p>
        </div>
      </section>
    </div>
  );
};
CastCard.propTypes = {
  casts: PropTypes.shape({
    profile_path: PropTypes.string,
    original_name: PropTypes.string,
    character: PropTypes.string,
  }).isRequired,
};

export default CastCard;
