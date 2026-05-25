import ArtistCard from './ArtistCard'
import ScrollRow from './ScrollRow'

const ARTISTS = [
  { name: 'Raim Laode', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg4qU0okJbTN6Oeb3OoIsRuGUSizofnqFLx5Vn3zxMThJaQM_VKMEvIcY6eaP1ppMjVC50ulkvHkNGB-yur8uVv-QrZ6Iz75SWm26FmLNNnQ&s=10', searchQuery: 'Raim Laode' },
  { name: 'Hindia', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwdlpaCd9MOVHZjObAtzc-UtSMaBiSZ3vyTBhMzPlVy93UInmQl8PoJHAmzvcQm3nlVgYYfFjER0J0SYJpKHujZn8TCOMRir_rDfO16xZ-&s=10', searchQuery: 'Hindia lagu' },
  { name: 'Sheila On 7', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJR6krfnxqJxXfy7WG8Zv0PxBpgpBOpN0VLCOzV8w0M1DHTPAae4PLsvwocIsDo6QAZ50HOgmJ9V_Ry2R3fCiEIclZq9zwrEC5poCATRA&s=10', searchQuery: 'Sheila On 7' },
  { name: 'Nadin Amizah', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBsEf0vge5x-6-peUAmNLJK-9HOIb3sufEp3zVDIhYvDHltiG2bz1EvAXXGpRDPNXeIKwGc1zdz02u4qOLCVQFwNe9I7kKYV9u0TSJiBam&s=10', searchQuery: 'Nadin Amizah' },
  { name: 'Pamungkas', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvunzQYPJewxz-oHzeid1S2SGhEdxh2JbAUIfUe5nRAa3xPGb98q5uCRSCWPWg91ivD-acMGKe2NbANQzi8jb5b9YfH7iWeGkxa4a_hgYxA&s=10', searchQuery: 'Pamungkas lagu' },
  { name: 'Tulus', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHj3xtcHrBR2uG5zD2HEJtdeJXk203eOBkK3jAIHae4wU6ml90edryLwjZ04vryrOdywMB_PAPNvN2BJ_EbfR7VvYN21OhVQg47U1PBrt&s=10', searchQuery: 'Tulus lagu' },
  { name: 'Dewa 19', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzHdp1-rPANEFFAvabdrZ1NZauGqUv5U0iEI_FxiZzPcEDhyFsOe13i3h9dZiP5ywuou8ALzZitX-8lQiy3qS6_0p-O-xKJsQXPoC5YOD&s=10', searchQuery: 'Dewa 19' },
  { name: 'Andmesh', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjic4J1s3p-0pbiEENEp8kGuVP_m1iS_95O0Fo6C5bPC5DgIgECqUK9Cmt7qQQzzBPqlUCC6Zm2nb-C_E0soCK9HQeT_kJwh_IdFDazRluoA&s=10', searchQuery: 'Andmesh Kamaleng' },
  { name: 'Rizky Febian', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSmZNCi29ZNg6W-5snc9NSimIz_Ivesonooj6IIxge-5OnlIS0K8iGy0cV1XOahe-NFr6r0xHCYehSFmBv8yyr6Ctb_VA74TVntpCAXt8&s=10', searchQuery: 'Rizky Febian' },
  { name: 'Bernadya', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv-J1EsFh_ALVVQ3O4LBbdYlY5-aj6JJMBnOjSYdszUlDXmg7C_WS8cfNrDEjrp1kMg3X1c8E_dL8D4EljEjDVpkacVpNZiENXjSOtnVPR&s=10', searchQuery: 'Bernadya lagu' },
  { name: 'Juicy Luicy', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbF7CzZNeuC_HPgmcHzYPQECwVNnNVG8G52x_wZ8zCDsgJHaJubSX5UkYgwtQIRIRV4ZPBrb3VVO8oPNzqwNw0x4k0WWFFNXNIrFzH4Un&s=10', searchQuery: 'Juicy Luicy' },
  { name: 'Coldplay', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNCUE6PNRBL_WwQ2tSL8yYUChf_fwgCxza5LPFPjvxOhTzKi3AV8lz7SG-9zphRvVzgjOlX0hSmOQQjX18wyJisK-4Yb8b0DTR4a4NnFH&s=10', searchQuery: 'Coldplay' },
]

export default function ArtistRow() {
  return (
    <ScrollRow title="Artis Populer">
      {ARTISTS.map(artist => (
        <ArtistCard key={artist.name} artist={artist} />
      ))}
    </ScrollRow>
  )
}