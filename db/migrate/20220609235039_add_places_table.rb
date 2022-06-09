class AddPlacesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :places, id: :uuid do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false

      # This adds in created_at and updated_at by default
      t.timestamps
    end
  end
end
