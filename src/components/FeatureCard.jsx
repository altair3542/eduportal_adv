function FeatureCard({ title, description }) {
  return (
    <article className="panel panel-soft feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default FeatureCard;
